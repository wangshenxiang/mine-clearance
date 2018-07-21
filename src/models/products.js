export default {
    namespace: 'products',
    state: [],
    reducers: {
      'delete'(state, { payload: id }) {
        let filter = state.filter(item => item.id !== id);
        return filter;
      },
    },
  };
