const logCRUDOperations = (req, res, next) => {
    const method = req.method;
    const path = req.originalUrl;
  
    // Only show body for POST, PUT, PATCH
    const methodsWithBody = ["POST", "PUT", "PATCH"];
    const hasBody = methodsWithBody.includes(method) && req.body && Object.keys(req.body).length > 0;
  
    const bodyLog = hasBody ? JSON.stringify(req.body) : "No body";
  
    console.log(`[${new Date().toISOString()}] ${method} ${path} - ${bodyLog}`);
    next();
  };
  
  export default logCRUDOperations;
  

