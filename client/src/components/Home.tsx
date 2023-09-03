import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Product = {
	[key: string]: any;
};

const Home: React.FC = () => {
	const [data, setdata] = useState<Product[]>([]);
	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((json) => setdata(json.products));
	}, []);
	data.map((ele) => console.log(ele));

	return (
		<>
			<Link to={"/test"}>To test</Link>
		</>
	);
};

export default Home;
