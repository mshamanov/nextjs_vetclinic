import Head from 'next/head'
import { Fragment } from "react";
import Welcome from "../src/components/Welcome";

export default function WelcomePage() {
    return (
        <Fragment>
            <Head>
                <title>Vet Clinic</title>
                <meta name="description" content="Vet Clinic" />
                <link rel="icon" href="favicon.ico" />
            </Head>
            <Welcome />
        </Fragment>
    )
}
