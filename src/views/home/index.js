import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import usePlatMark from "../../hooks/usePlatMark";



const Home = () => {

    const { active } = useWeb3React();

    const [maxSupply, setMaxSupply] = useState();

    const platMark = usePlatMark();

    const getMaxSupply = useCallback(async () => {
        if (platMark) {
            const result = await platMark.methods.maxSupply().call();
            setMaxSupply(result);
        }
    }, [platMark]);

    useEffect(()=> {
        getMaxSupply();
    }, [getMaxSupply]);

    if (!active) return "Conecta tu wallet";

    return(
        <div>
            <p>Max supply: {maxSupply}</p>
        </div>
    );
}

export default Home;