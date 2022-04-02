import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from 'react';
import usePlatMark from '../usePlatMark';


const getPunkData = async ({ platPunks, tokenId }) => {
    const [
        tokenURI,
        dna,
        owner,
        accesoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
    ] = await Promise.all([
        platPunks.methods.tokenURI(tokenId).call(),
        platPunks.methods.tokenDNA(tokenId).call(),
        platPunks.methods.ownerOf(tokenId).call(),
        platPunks.methods.getAccesoriesType(tokenId).call(),
        platPunks.methods.getAccesoriesType(tokenId).call(),
        platPunks.methods.getClotheColor(tokenId).call(),
        platPunks.methods.getClotheType(tokenId).call(),
        platPunks.methods.getEyeType(tokenId).call(),
        platPunks.methods.getEyeBrowType(tokenId).call(),
        platPunks.methods.getFacialHairColor(tokenId).call(),
        platPunks.methods.getFacialHairType(tokenId).call(),
        platPunks.methods.getHairColor(tokenId).call(),
        platPunks.methods.getHatColor(tokenId).call(),
        platPunks.methods.getGraphicType(tokenId).call(),
        platPunks.methods.getMouthType(tokenId).call(),
        platPunks.methods.getSkinColor(tokenId).call(),
        platPunks.methods.getTopType(tokenId).call(),
    ]);

    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes: {
            accesoriesType,
            clotheColor,
            clotheType,
            eyeType,
            eyeBrowType,
            facialHairColor,
            facialHairType,
            hairColor,
            hatColor,
            graphicType,
            mouthType,
            skinColor,
            topType,
        },
        tokenURI,
        dna,
        owner,
        ...metadata,
    }
};

// Only get all image punks.
const usePlatMarksData = ({ owner = null } = { }) => {

    const [punks, setPunks] = useState([]);
    const { library } = useWeb3React();
    const [loading, setLoading] = useState(true);
    const platPunks = usePlatMark();

    const update = useCallback(async () => {

        if(platPunks) {
            setLoading(true);

            let tokenIds;

            if(!library.utils.isAddress(owner)) {
                const totalSupply = await platPunks.methods.totalSupply().call();

                tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);
            } else {
                const balanceOf = await platPunks.methods.balanceOf(owner).call();

                const tokenIdsOfOwner = new Array(Number(balanceOf))
                .fill()
                .map((_, index) => 
                platPunks.methods.tokenOfOwnerByIndex(owner, index).call());

                tokenIds = await Promise.all(tokenIdsOfOwner);
            }

           

            const punksPromise = tokenIds.map((tokenId) => getPunkData({ tokenId, platPunks }));

            const punks = await Promise.all(punksPromise);

            setPunks(punks);


            setLoading(false);
        }

    }, [platPunks, owner, library?.utils]);

    useEffect(()=>{
        update();
    },[update]);

    return {
        loading,
        punks,
        update,
    };

};


// Get one Punk
const usePlatMarkDataOne = (tokenId = null) => {
    
    const [punk, setPunk] = useState({});

    const [loading, setLoading] = useState(true);

    const platPunks = usePlatMark();

    const update = useCallback(async () => {

        if(platPunks && tokenId != null) {
            setLoading(true);

            const toSet = await getPunkData({ tokenId, platPunks });

            setPunk(toSet);

            setLoading(false);
        }

    }, [platPunks, tokenId]);

    useEffect(() => {
        update();
    }, [update]);

    return {
        loading,
        punk,
        update,
    }

};


export { usePlatMarksData, usePlatMarkDataOne };