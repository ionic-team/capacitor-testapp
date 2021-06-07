import { Store } from "pullstate";

const AppStore = new Store({
  result: null,
  error: null
});

export default AppStore;