export default {
    namespace: 'products',
    state: [],
    reducers: {
      'delete'(state, { payload: id }) {
        console.log(state);
        let filter = state.filter(item => item.id !== id);
        console.log(filter);
        console.log(state);
        return filter;
      },
    },
  };
