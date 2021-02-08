const Greetee = (props) => {
    console.log(props);
    return <span>{props.firstName || "awesome potatoes"}</span>;
};

export default Greetee;
