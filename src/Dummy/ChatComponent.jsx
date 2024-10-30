import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ChatComponent() {
  const messages = [
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "Hii",
    "how are You ?",
    "i am fine",
    "new Message 1",
  ];
  const slice = messages.slice(0, 10);
  const [items, setItems] = useState(slice);
  const [hasMore, setHasMore] = useState(true);
  //   const bottomRef = useRef(null);
  //   useEffect(() => {
  //     scrollBottom();
  //   }, []);

  //   const scrollBottom = () => {
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };
  const fetchMoreData = () => {
    if (items.length >= messages.length) {
      setHasMore(false);
      return;
    }
    // Simulate a fetch response
    setTimeout(() => {
      setItems(items.concat(messages.slice(items.length, items.length + 20)));
    }, 1500);
  };

  return (
    <div
      id="scrollableDiv"
      style={{ overflow: "auto", height: "50vh", background: "gray" }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        height={"80vh"}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {items.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
export default ChatComponent;
