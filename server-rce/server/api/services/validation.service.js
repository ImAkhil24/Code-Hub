class ValidationService {
  async execute(code, input, lang, id) {
    // console.log("validating");
    switch (lang) {
      case "javascript": {
        return {
          isValid: true,
        };
      }
      case "python": {
        return {
          isValid: true,
        };
      }
      case "cpp": {
        return {
          isValid: true,
        };
      }
      case "c": {
        return {
          isValid: true,
        };
      }
      default: {
        return {
          isValid: false,
          message: "Please select a valid language",
        };
      }
    }
  }
}

export default new ValidationService();
