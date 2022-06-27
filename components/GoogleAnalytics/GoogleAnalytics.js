import React from 'react';
import { connect } from "react-redux";
import Script from "next/script";

const GoogleAnalytics = ({ widgets }) => {
    return (
        <>
            {widgets != null ?
                widgets?.GOOGLE_ANALYTICS ?
                    widgets?.GOOGLE_ANALYTICS?.record_status == "ACTIVE" ?
                        <>
                            <Script
                                strategy="lazyOnload"
                                src={`https://www.googletagmanager.com/gtag/js?id=${widgets != null && widgets?.GOOGLE_ANALYTICS?.integration_attributes?.trackingId}`}
                            />

                            <Script strategy="lazyOnload">
                                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${widgets != null && widgets?.GOOGLE_ANALYTICS?.integration_attributes?.trackingId}', {
              page_path: window.location.pathname,
            });
                `}
                            </Script>
                        </>
                        :
                        ""
                    :
                    ""
                :
                ""
            }
        </>
    );
};

const mapStateToProps = state => ({
    widgets: state.store.widgets,
})
export default connect(mapStateToProps)(GoogleAnalytics);