const MyEnvironment = {

  getServiceUrl: (path) => {

    const env = MyEnvironment.Port;
    return new URL(`https://${path}-${env}${domainName}`);
  },

  Port: process.env.PORT || 5000,

  DbConnection: {
    host: process.env.host ||'159.65.13.107', 
    port: process.env.port || 3306,        
    user: process.env.user || 'piseth',  
    database: process.env.database || 'image_editor',  
    password:process.env.password || 'Piseth2357.!',  
    dialect: 'mysql',   
  },

  Jwt_Secret:process.env.jwt || 'da5c1746ffcd268f43be31aa5379b9da03e3aa91f0069ae3afa07b11543e6fee',
  PaddleKey:process.env.jwt || 'pdl_sdbx_apikey_01jv1w5sz1txhgag2z4cxwt1xn_QethEDb0znaeeKxZd35nk6_AiQ'

  
};

export default MyEnvironment;
