export const formattedErrorKey = (e) => {
    console.log('ERROR====>>>', e);

    if (typeof e !== 'string') {
        return 'try_again';
    }

    return e
        .replace(/[^\w\s]/g, '_')
        .replace(
            /\s+/g,
            '_',
        );
};