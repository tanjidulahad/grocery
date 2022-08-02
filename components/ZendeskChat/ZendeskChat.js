import Head from 'next/head';
import React, { useState } from 'react';
import { connect } from "react-redux";


const ZendeskChat = ({ widgets }) => {
    const [zendeskCodekey, setZendeskCodekey] = useState(null)
    if (typeof window != 'undefined' && widgets != null) {
        const parser = new DOMParser();
        if (widgets?.ZENDESK?.record_status == "ACTIVE" && widgets?.ZENDESK?.integration_attributes?.code) {
            const zendeskCode = parser.parseFromString(widgets?.ZENDESK?.integration_attributes?.code, "text/html")
            const key = zendeskCode.head.getElementsByTagName('script')[0].src.split("key=")[1]
            if (!zendeskCodekey && key) {
                setZendeskCodekey(key)
            }
        }
    }

    return (
        <>

            <Head>
                {
                    zendeskCodekey && <script id="ze-snippet" src={`https://static.zdassets.com/ekr/snippet.js?key=${zendeskCodekey}`}> </script>
                }
            </Head>


        </>
    );
};

const mapStateToProps = state => ({
    widgets: state.store.widgets,
})
export default connect(mapStateToProps)(ZendeskChat);