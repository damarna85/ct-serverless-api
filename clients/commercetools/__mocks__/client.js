const client = {
  customers: {
    _save: jest.fn((path = '/client', customer) =>
      Promise.resolve({
        body: {
          customer: {
            id: 'customer-id',
          },
        },
      })
    ),
  },
};

module.exports = { client };
