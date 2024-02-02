const getEdad = (epoch) => {
  const birthday = new Date(epoch * 1000);
  const age = new Date(Date.now() - birthday.getTime());
  return Math.abs(age.getUTCFullYear() - 1970);
};

export default getEdad;