import { useState, useEffect } from "react";
import classNames from "classnames";
import "./App.css";

function App() {
    const initialPosts = [
        { msg: "Happy New Year 2025! Embrace joy and positivity in every moment!", date: "01/01/25" },
        { msg: "Wishing you a bright and shining year ahead filled with dreams!", date: "06/01/25" },
        { msg: "May 2025 bring you creativity and the courage to create your paradise!", date: "05/01/25" },
        { msg: "Cheers to new friendships and warm moments in the new year!", date: "09/01/25" },
        { msg: "Celebrate the seasons of 2025 with joy and gratitude!", date: "11/01/25" },
        { msg: "Craft your happiness this year and make your dreams a reality!", date: "03/01/25" },
        { msg: "Explore the beauty of 2025 and discover new adventures!", date: "03/01/25" },
        { msg: "Stay updated and embrace the excitement of new beginnings in 2025!", date: "08/01/25" },
        { msg: "Maximize your joy and enjoy every moment of this wonderful year!", date: "05/01/25" },
        { msg: "Connect with loved ones and create unforgettable memories in 2025!", date: "08/01/25" }
    ]

    const [post, setPost] = useState([]);
    const [like, setLike] = useState(new Array(initialPosts.length).fill(0));
    const [isRemove, setIsRemove] = useState(new Array(initialPosts.length).fill(false));
    const [newMsg, setNewMsg] = useState("");


    useEffect(() => {
        // 날짜 기준으로 초기 포스트 정렬
        const init = [...initialPosts].sort((a, b) => {
            const dateA = new Date(`20${a.date.split('/')[2]}`, a.date.split('/')[1] - 1, a.date.split('/')[0]);
            const dateB = new Date(`20${b.date.split('/')[2]}`, b.date.split('/')[1] - 1, b.date.split('/')[0]);
            return dateB - dateA; // 최신 날짜가 먼저 오도록 정렬
        });
        setPost(init);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    const [sortType, setSortType] = useState("Latest Date");

    const sortAlphabet = () => {
        setPost((prev) => {
            const sortNewAlphabet = [...prev].sort((a, b) => {
                return a.msg.localeCompare(b.msg);
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

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(formatDate(new Date()));
    }, []);

    const formatDate = (date) => {
        const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
        const day = String(date.getDate()).padStart(2, '0'); // 일

        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <header>
                <div className={"header_inner"}>
                    <h1>SEND ME A MESSAGE</h1>
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
                                !isRemove[index] && (
                                    <li key={index}>
                                        <div className={"top_area"}>
                                            <h3>{item.msg}</h3>
                                        </div>
                                        <div className={"bottom_area"}>
                                            <span>{item.date}</span>
                                            <div>
                                                <div
                                                    className={"like_area"}
                                                    onClick={()=> {
                                                        setLike((i)=> {
                                                            let copyLike = [...i];
                                                            copyLike[index] += 1;
                                                            return copyLike;
                                                        });
                                                    }}>
                                                    <i className={"xi-heart-o"}></i>
                                                    <span>{like[index]}</span>
                                                </div>
                                                <div className={"remove_post_btn_wrap"}>
                                                    <button
                                                        type={"button"}
                                                        onClick={()=> {
                                                            setIsRemove((prev)=> {
                                                                let copyIsRemove = [...prev];
                                                                isRemove[index] = true;
                                                                return copyIsRemove;
                                                            })
                                                        }}
                                                    >
                                                        <i className={"xi-close"}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            ))}
                            <li className={"add_post_area"}>
                                <div className={"top_area"}>
                                    <input type="text"
                                           placeholder={"SEND ME A MESSAGE!"}
                                           onChange={(e)=> {
                                                console.log(e.target.value);
                                                setNewMsg(e.target.value)
                                            }}
                                           value={newMsg}
                                    />
                                </div>
                                <div className={"bottom_area"}>
                                    <span>{currentDate}</span>
                                    <div className={"add_post_btn_wrap"}>
                                        <button
                                            type={"button"}
                                            onClick={()=> {
                                                if (newMsg.trim()) {
                                                    const newPost = { msg: newMsg, date: currentDate };
                                                    setPost((prev)=> [newPost, ...prev]);
                                                    setLike((prev)=>[0, ...prev]);
                                                    setIsRemove((prev)=>[false, ...prev]);
                                                    setNewMsg("");
                                                }
                                            }}
                                        >
                                            SEND
                                        </button>
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

function MessageWindow() {
    return (
        <div className={"message_window"}>
            <div className={"inner"}>

            </div>
        </div>
    )
}

export default App;