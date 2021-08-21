const respond = async (req, res) => {
  res.json({
    success: true,
    status: 200,
    data: res.locals.data,
  });
};

export default respond;
