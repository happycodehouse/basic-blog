import { useState, useEffect } from "react";
import classNames from "classnames";
import "./App.css";

function App() {
    const initialPosts = [
        { title: "Happy New Year 2025! Embrace joy and positivity in every moment!", date: "15/01/25" },
        { title: "Wishing you a bright and shining year ahead filled with dreams!", date: "22/03/25" },
        { title: "May 2025 bring you creativity and the courage to create your paradise!", date: "05/06/25" },
        { title: "Cheers to new friendships and warm moments in the new year!", date: "18/07/25" },
        { title: "Celebrate the seasons of 2025 with joy and gratitude!", date: "29/09/25" },
        { title: "Craft your happiness this year and make your dreams a reality!", date: "03/11/25" },
        { title: "Explore the beauty of 2025 and discover new adventures!", date: "11/02/25" },
        { title: "Stay updated and embrace the excitement of new beginnings in 2025!", date: "27/04/25" },
        { title: "Maximize your joy and enjoy every moment of this wonderful year!", date: "14/08/25" },
        { title: "Connect with loved ones and create unforgettable memories in 2025!", date: "20/12/25" }
    ]

    const [post, setPost] = useState([]);

    useEffect(() => {
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
    };

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
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(formatDate(new Date()));
    }, []);

    const formatDate = (date) => {
        const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
        const day = String(date.getDate()).padStart(2, '0'); // 일

        return `${year}/${month}/${day}`;
    };

    return (
        <>
            <header>
                <div className={"header_inner"}>
                    <h1>please leave me a sentence!</h1>
                </div>
            </header>
            <div className={"container"}>
                <div className={"sec sec1"}>
                    <div className={"inner"}>
                        <div className={"sort_btn_wrap"}>
                            <span>Sorted: {sortType}</span>
                            <div className={"sort_btn"}>
                                <span
                                    className={classNames(sortType === "Alphabetically" ? "active" : "")}
                                    onClick={() => {
                                        setSortType("Alphabetically");
                                        sortAlphabet();
                                    }}
                                ><i className={"xi-list"}></i></span>
                                <span
                                    className={classNames(sortType === "Latest Date" ? "active" : "")}
                                    onClick={() => {
                                        setSortType("Latest Date");
                                        sortDate();
                                    }}
                                ><i className={"xi-calendar"}></i></span>
                            </div>
                        </div>
                        <div className={"new_post_area"}>
                            <span>{}</span>
                        </div>
                        <ul className={"post_list"}>
                            {post.map((item, index) => (
                                <li key={index}>
                                    <div className={"top_area"}>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className={"bottom_area"}>
                                        <span>{item.date}</span>
                                        <div>
                                            <div className={"like_area"}>
                                                <i className={"xi-heart-o"}></i>
                                                <span>{like[index]}</span>
                                            </div>
                                            <div className={"remove_post_btn_wrap"}>
                                                <button type={"button"}><i className={"xi-close"}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li className={"add_post_area"}>
                                <div className={"top_area"}>
                                    <input type="text" placeholder={"SEND ME A MESSAGE!"}/>
                                </div>
                                <div className={"bottom_area"}>
                                    <span>{currentDate}</span>
                                    <div className={"add_post_btn_wrap"}>
                                        <button type={"button"}>SEND</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;