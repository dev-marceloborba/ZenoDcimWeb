import Avatar from "@mui/material/Avatar";
import useRouter from "modules/core/hooks/useRouter";
import { EWorkOrderStatus } from "modules/maintenance/models/work-order.model";
import Loading from "modules/shared/components/Loading";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import getDateFormat from "modules/utils/helpers/getDateFormat";
import { useFindWorkOrderEventsByIdQuery } from "modules/maintenance/services/work-order-events.service";

export default function WorkOrderTimelinePage() {
  const { params } = useRouter();
  const { data: workOrderEvents, isLoading } = useFindWorkOrderEventsByIdQuery(
    params.workOrderId!
  );

  return (
    <>
      <Timeline position="right">
        {workOrderEvents?.map(({ id, createdAt, status, info, user }, idx) => {
          const isLast = workOrderEvents.length - 1 === idx;
          return (
            <TimelineItem key={id}>
              <TimelineOppositeContent
                color="text.secondary"
                align="center"
                variant="body2"
              >
                {getDateFormat(createdAt)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: isLast ? "#3a76dd" : "#6b6b6b",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: isLast ? "#3a76dd" : "#6b6b6b",
                      color: "#fff",
                      fontSize: 14,
                    }}
                  >
                    {idx + 1}
                  </Avatar>
                </TimelineDot>
                {!isLast ? <TimelineConnector /> : null}
              </TimelineSeparator>
              <TimelineContent>
                {getTextFromStatus(status, user)}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Loading open={isLoading} />
    </>
  );
}

function getTextFromStatus(status: EWorkOrderStatus, responsible: string) {
  switch (status) {
    case EWorkOrderStatus.DRAFT:
      return "Rascunho de ordem de serviço criado por " + responsible;
    case EWorkOrderStatus.APPROVED:
      return "Ordem de serviço aprovada por " + responsible;
    case EWorkOrderStatus.CANCELED:
      return "Ordem de serviço cancelada por " + responsible;
    case EWorkOrderStatus.FINISHED:
      return "Ordem de serviço concluída por " + responsible;
    case EWorkOrderStatus.IN_APPROVAL:
      return "Ordem de serviço em fase de aprovamento";
    case EWorkOrderStatus.IN_EXECUTION:
      return "Ordem de serviço iniciada por " + responsible;
    case EWorkOrderStatus.REJECTED:
      return "Ordem de serviço rejeitada por " + responsible;
    case EWorkOrderStatus.WAITING_EXECUTION:
      return "Aguardando execução da ordem de serviço";
  }
}
