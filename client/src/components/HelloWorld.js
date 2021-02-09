import Greetee from "./Greetee";
import Counter from "./Counter";

const HelloWorld = () => {
    const name = "Freddy";
    return (
        <div className="name">
            <h1>
                Hello <Greetee firstName={name} />
            </h1>
            <h1>
                Hello <Greetee firstName="Adobo" />
            </h1>
            <h1>
                Hello <Greetee />
            </h1>
            <Counter />
        </div>
    );
};

export default HelloWorld;
