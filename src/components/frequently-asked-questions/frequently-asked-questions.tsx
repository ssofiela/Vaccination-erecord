import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import * as Panel from "../common/panel";

const FrequentlyAskedQuestions: React.FC = () => {
    return (
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <Typography>FAQ</Typography>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Body>
                        <Typography variant="h6">What is a vaccination card?</Typography>
                        <Typography>Vaccination card is a paper card where doctors have written the vaccinations the person has taken. Usually the card contains at least the vaccination code or abbreviation and the date taken. Sometimes the next booster dose is also marked.
                        Most people in Finland have received a vaccination card from the maternity clinic and those who have served in military have received another card for the vaccination received there.
                        The appearances of the vaccination cards vary depending on the time and place the card was written, but see the <a href="https://yle.fi/uutiset/3-10555378" target="_blank" rel="noopener noreferrer">article from Yle</a> for a sample picture.</Typography>
                        <br/>
                        <Typography variant="h6">I have lost my vaccination card. How I know what vaccinations I have?</Typography>
                        <Typography>If you have lived your childhood in Finland there are multiple ways to find out the vaccinations you have even if you have lost you vaccination card. Below is the summary of an excellent <a href="https://yle.fi/uutiset/3-10555378" target="_blank" rel="noopener noreferrer">Yle article</a> (only in Finnish):</Typography>
                        <ol>
                            <li>Ask your parents if you have received all vaccinations in the Finland&apos;s vaccination program. If yes you can <a href="https://thl.fi/fi/web/rokottaminen/kansallinen-rokotusohjelma/rokotusohjelman-historia" target="_blank" rel="noopener noreferrer">check your vaccinations</a> using your birth year.</li>
                            <li>Ask the health centers you have visited, you can get a copy of your own health records</li>
                            <li>Ask your health records from army if you have served in military</li>
                            <li>Check Omakanta service for recent vaccinations</li>
                        </ol>
                        <br/>
                        <Typography variant="h6">Where is your vaccination information coming from?</Typography>
                        <Typography>We are using the national <a href="https://koodistopalvelu.kanta.fi/codeserver/pages/classification-view-page.xhtml?classificationKey=1924&versionKey=2184" target="_blank" rel="noopener noreferrer">public vaccination database from THL</a> (only in Finnish).</Typography>
                        <br/>
                        <Typography variant="h6">I&apos;m travelling, how I know what vaccination I need to take?</Typography>
                        <Typography>We are planning to implement a search function where you can enter the destination country and get a list of missing vaccination. At the moment we propose to check e.g. <a href="https://www.terveyskirjasto.fi/terveyskirjasto/ktl.mat?p_artikkeli=mat00055" target="_blank" rel="noopener noreferrer">THL&apos;s Matkailijan terveysopas</a></Typography>
                        <br/>
                        <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"  target="_blank" rel="noopener noreferrer">www.flaticon.com</a></small>
                    </Panel.Body>
                </Grid>
            </Grid>
        </Panel.Container>
    );
};

export default FrequentlyAskedQuestions;
