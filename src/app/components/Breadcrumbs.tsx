import React from 'react'
import Link, { LinkProps } from '@mui/material/Link'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation } from 'react-router-dom'

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/zeno/admin': 'Admin',
    // '/trash': 'Trash',
    // '/spam': 'Spam',
    // '/drafts': 'Drafts',
};

const LinkRouter = (props: LinkRouterProps) => (
    <Link {...props} component={RouterLink as any} />
)

const Breadcrumbs: React.FC = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
    return (
        <MuiBreadcrumbs>
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {
                pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    console.log(`last: ${last}`)
                    console.log(`to: ${to}`)

                    return last ? (
                        <Typography color="text.primary" key={to}>
                            {breadcrumbNameMap[to]}
                        </Typography>
                    ) : (
                        <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                            {breadcrumbNameMap[to]}
                        </LinkRouter>
                    )
                })
            }
        </MuiBreadcrumbs>
    )
}

export default Breadcrumbs