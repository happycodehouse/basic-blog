import {useState, useEffect} from "react";

import classNames from "classnames";
import "./App.css";

function App() {
    const initialPosts = [
        { title: "Life on Animal Crossing: Tips and Tricks for Every Player", date: "15/01/25" },
        { title: "My Island Diary: Adventures in Animal Crossing", date: "22/03/25" },
        { title: "Designing Dream Islands: Creative Ideas for Your Paradise", date: "05/06/25" },
        { title: "Villager Spotlight: Getting to Know My Animal Friends", date: "18/07/25" },
        { title: "Seasonal Events: Celebrating Holidays in Animal Crossing", date: "29/09/25" },
        { title: "Crafting and Customizing: DIY Projects in Animal Crossing", date: "03/11/25" },
        { title: "Fishing and Foraging: Exploring Nature in Animal Crossing", date: "11/02/25" },
        { title: "Animal Crossing Updates: What's New in the Game?", date: "27/04/25" },
        { title: "Island Life Hacks: Maximizing Your Gameplay Experience", date: "14/08/25" },
        { title: "Community Connections: Making Friends in Animal Crossing", date: "20/12/25" }
    ];
    const [post, setPost] = useState([]);

    useEffect(()=> {
        const init = [...initialPosts].sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        setPost(init);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    const [sortType, setSortType] = useState("Alphabetically");
    const [sortActive, setSortActive] = useState("Alphabetically");

    const sortAlphabet = () => {
        setPost((prev) => {
            const sortNewAlphabet = [...prev].sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            return sortNewAlphabet;
        });
    }

    const sortDate = () => {
        setPost((prev) => {
            const sortNewDate = [...prev].sort((a, b) => {
                const dateA = new Date(`20${a.date.split('/')[2]}`, a.date.split('/')[1] - 1, a.date.split('/')[0]);
                const dateB = new Date(`20${b.date.split('/')[2]}`, b.date.split('/')[1] - 1, b.date.split('/')[0]);
                return dateB - dateA;
            });

            return sortNewDate;
        });
    };

    const [like, setLike] = useState(new Array(initialPosts.length).fill(0));

    return (
        <>
            <header>
                <div className={"header-inner"}>
                    <h1>basic features blog</h1>
                </div>
            </header>
            <div className={"container"}>
                <div className={"sec sec1"}>
                    <div className={"inner"}>
                        <div className={"sort-btn-wrap"}>
                            <span>Sorted: {sortType}</span>
                            <div className={"sort-btn"}>
                                <span
                                    className={classNames( sortType == "Alphabetically" ? "active" : "" )}
                                    onClick={() => {
                                        setSortType("Alphabetically");
                                        sortAlphabet();
                                    }}
                                ><i className={"xi-list"}></i></span>
                                <span
                                    className={classNames( sortType == "Latest Date" ? "active" : "" )}
                                    onClick={() => {
                                        setSortType("Latest Date");
                                        sortDate();
                                    }}
                                ><i className={"xi-calendar"}></i></span>
                            </div>
                        </div>
                        <div className={"new-post-area"}>
                            <span>{}</span>
                        </div>
                        <ul className={"post-list"}>
                            {post.map((item, index) => (
                                <li key={index}>
                                    <div className={"top-area"}>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className={"bottom-area"}>
                                        <span>{item.date}</span>
                                        <div className={"like-area"}>
                                            <i className={"xi-heart-o"}></i>
                                            <span>{like[index]}</span>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
