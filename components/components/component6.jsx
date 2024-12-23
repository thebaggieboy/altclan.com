import styles from "../../styles/component6.module.css";

const contents = [
    {
      id: 1,
      title: "HOW TO SHOP",
      href: "#",
      imageSrc: "/img/hanger.png",
      description:
        "Your guide to shopping and placing orders.",
    },
    {
      id: 2,
      title: "FAQS",
      href: "#",
      imageSrc: "/img/help.png",
      description:
        "Your questions answered.",
    },
    {
      id: 3,
      title: "NEED HELP?",
      href: "#",
      imageSrc: "/img/Chat room.png",
      description:
        "Contact our help lines.",
    },
];

export default function cards() {
    return (
       <>
       <div className=" ">
       <div className={styles.row}>
            {contents.map((content) => (
                <div key={content.id}>
                    <a key={content.id} href={content.href}>
                        <div className={styles.contentCol}>
                            <div className={styles.content}>
                                <img src={content.imageSrc} alt="" className={styles.productImage}/>

                                <h1>
                                    {content.title}
                                </h1>


                                <p>
                                    {content.description}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
       </div>
       <br />
       </>

    );
};