import { TwitterTimelineEmbed } from "react-twitter-embed";
import { motion } from "framer-motion";
import axios from "./axios";

const hoverVariants = {
    hidden: {},
    visible: {
        x: -9,
        duration: 0.5,
    },
};

const TwitterFeed = ({ feed, updateFeed }) => {
    const saveChoice = async (item) => {
        try {
            const feed = await axios.post(`/api/feed/${item}`);
            return updateFeed(feed.data.newFeed[0].feed);
        } catch (error) {
            console.log("error saving feed choice", error);
        }
    };

    const feeds = [
        {
            id: 1,
            handle: "BBCBreaking",
            logo:
                "https://pbs.twimg.com/profile_images/1150716997254209536/M7gkjsv5_400x400.jpg",
        },
        {
            id: 2,
            handle: "DeutscheWelle",
            logo:
                "https://pbs.twimg.com/profile_images/900269457976823808/nkod9w_m_400x400.jpg",
        },
        {
            id: 3,
            handle: "welt",
            logo:
                "https://pbs.twimg.com/profile_images/775627854293954561/Y4iLEu_V_400x400.jpg",
        },
        {
            id: 4,
            handle: "reactjs",
            logo:
                "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png",
        },
        {
            id: 5,
            handle: "NASA",
            logo:
                "https://pbs.twimg.com/profile_images/1321163587679784960/0ZxKlEKB_400x400.jpg",
        },
        {
            id: 6,
            handle: "nytimes",
            logo:
                "https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png",
        },
        {
            id: 7,
            handle: "syntaxfm",
            logo:
                "https://pbs.twimg.com/profile_images/875075946096676864/MEEwGMpY_400x400.jpg",
        },
        {
            id: 8,
            handle: "JavaScript",
            logo:
                "https://pbs.twimg.com/profile_images/827354992377860096/sUe4dG_L_400x400.jpg",
        },
        {
            id: 9,
            handle: "TheOnion",
            logo:
                "https://pbs.twimg.com/profile_images/875392068125769732/yrN-1k0Y_400x400.jpg",
        },
        {
            id: 10,
            handle: "PR0GRAMMERHUM0R",
            logo:
                "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        },
        {
            id: 11,
            handle: "elonmusk",
            logo:
                "https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_400x400.jpg",
        },
        {
            id: 13,
            handle: "ReutersTech",
            logo:
                "https://pbs.twimg.com/profile_images/877265642742665216/sI-pwn-h_400x400.jpg",
        },
        {
            id: 14,
            handle: "TechRepublic",
            logo:
                "https://pbs.twimg.com/profile_images/842067018358624256/eHpTR1g8_400x400.jpg",
        },
        {
            id: 15,
            handle: "WIRED",
            logo:
                "https://pbs.twimg.com/profile_images/1228050699348561920/YvWAQD2L_400x400.jpg",
        },
        {
            id: 16,
            handle: "EarthPix",
            logo:
                "https://pbs.twimg.com/profile_images/712703916358537217/mcOketun_400x400.jpg",
        },
        // { id: 16, handle: "DeutscheWelle", logo: "DW" },
        // { id: 16, handle: "DeutscheWelle", logo: "DW" },
        // { id: 16, handle: "DeutscheWelle", logo: "DW" },
    ];

    return (
        <div className="flex h-56 space-x-5">
            <div className=" centerContent">
                <div className="selfCenter standardWidth">
                    <TwitterTimelineEmbed
                        sourceType="widget"
                        noScrollbar={true}
                        key={`${feed}`}
                        widgetId="539487832448843776"
                        screenName={`${feed}`}
                        noHeader={true}
                        noFooter={true}
                        options={{ height: 650, width: 400 }}
                    />
                </div>
            </div>

            <div className="flex flex-col ">
                {feeds.map((feed) => {
                    return (
                        <div key={feed.id}>
                            {" "}
                            <motion.div
                                variants={hoverVariants}
                                whileHover="visible"
                                onClick={() => {
                                    saveChoice(feed.handle);
                                }}
                            >
                                {" "}
                                <img
                                    className="object-cover mx-3 my-1 rounded-full shadow-lg cursor-pointer hover:opacity-90 w-9 h-9"
                                    src={`${feed.logo}`}
                                    alt=""
                                />
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TwitterFeed;
