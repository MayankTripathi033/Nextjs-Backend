// src/pages/swagger.tsx

import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerPage: React.FC = () => {
  return (
    <div>
      <SwaggerUI url="/api/swagger" />
    </div>
  );
};

export default SwaggerPage;
