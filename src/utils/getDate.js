const getDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleDateString(false, { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default getDate;
