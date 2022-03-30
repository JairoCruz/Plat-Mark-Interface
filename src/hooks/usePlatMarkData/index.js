const getPunkData = async({ platPunks, tokenId }) => {
    const [tokenURI, dna, owner, accesoriesType] = await Promise.all([
        platPunks.method.tokenURI(tokenId).call(),
        platPunks.method.tokenDNA(tokenId).call(),
        platPunks.method.ownerOf(tokenId).call(),
        platPunks.method.getAccessoriesType(tokenId).call(),
    ]);

    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes: {
            accesoriesType,
        },
        tokenURI,
        dna,
        owner,
        ...metadata,
    }
};

// Only get all image punks.
const usePlatMarksData = () => {

}