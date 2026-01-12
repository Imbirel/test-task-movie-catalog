module.exports = (req, res, next) => {
  if (req.method === 'GET' && req.query._fields) {
    const fields = req.query._fields.split(',');

    const originalSend = res.send;

    res.send = function (body) {
      let data = JSON.parse(body);

      if (Array.isArray(data)) {
        data = data.map((item) => {
          let filteredItem = {};
          fields.forEach((field) => {
            if (item[field] !== undefined) filteredItem[field] = item[field];
          });
          return filteredItem;
        });
      } else if (typeof data === 'object') {
        let filteredItem = {};
        fields.forEach((field) => {
          if (data[field] !== undefined) filteredItem[field] = data[field];
        });
        data = filteredItem;
      }

      return originalSend.call(this, JSON.stringify(data));
    };
  }
  next();
};
