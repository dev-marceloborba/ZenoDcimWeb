import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material/styles";

type TransferListProps = {
  sx?: SxProps<Theme>;
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
  onSave(rightItems: TransferListItem[]): void;
};

export type TransferListItem = {
  id: string;
  label: string;
};

function not(a: readonly TransferListItem[], b: readonly TransferListItem[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(
  a: readonly TransferListItem[],
  b: readonly TransferListItem[]
) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList: React.FC<TransferListProps> = ({
  sx,
  leftItems,
  rightItems,
  onSave,
}) => {
  const [checked, setChecked] = React.useState<readonly TransferListItem[]>([]);
  const [left, setLeft] = React.useState<TransferListItem[]>([]);
  const [right, setRight] = React.useState<TransferListItem[]>([]);

  React.useEffect(() => {
    setLeft(leftItems);
  }, [leftItems]);

  React.useEffect(() => {
    setRight(rightItems);
  }, [rightItems]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TransferListItem) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleOnSave = () => {
    onSave(right);
  };

  const customList = (items: readonly TransferListItem[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: TransferListItem) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.label}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.label} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={sx}
      >
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
        <Button sx={{ ml: 2 }} variant="contained" onClick={handleOnSave}>
          Salvar
        </Button>
      </Grid>
    </>
  );
};

export default TransferList;
