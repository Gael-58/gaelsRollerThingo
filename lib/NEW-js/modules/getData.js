  async function getData(route) {
    try {
      const response = await fetch(new Request(route));
      const output = await response.json();
      return output;
    } catch (error) {
      console.error("error: " + error);
    }
  }
  export {getData};