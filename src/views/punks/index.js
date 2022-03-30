import { useWeb3React } from '@web3-react/core';
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';

const Punks = () => {

    const { active } = useWeb3React();

    if (!active) return <RequestAccess />;

    return (
        <>
        <p>Gallery</p>
        </>
    );
}

export default Punks