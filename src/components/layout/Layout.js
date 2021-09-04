import Head from "next/head";
import { Fragment } from "react";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import Title from "./Title";

const Layout = ({children}) => {
    return <Fragment>
        <Head>
            <title>Vet Clinic</title>
            <meta name="description" content="Vet Clinic" />
        </Head>
        <div id="overlays" />
        <div className={classes.wrapper}>
            <div className={classes["nav-container"]}>
                <Title />
                <Navigation />
            </div>
            <main className={classes.main}>
                {children}
            </main>
            <footer className={classes.footer}>
                Copyright &copy; Vet Clinic {new Date().getFullYear()}
            </footer>
        </div>
    </Fragment>
}

export default Layout;