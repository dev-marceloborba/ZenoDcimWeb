import React from 'react'
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ConnectionModal: React.FC = () => {
    return <Container maxWidth="md">
        <Box component="form" noValidate autoComplete="off" >
            <Typography variant="h5">Nova conexão</Typography>
            <Button variant="contained" type="submit" fullWidth>Salvar</Button>
        </Box>
    </Container>
}

export default ConnectionModal