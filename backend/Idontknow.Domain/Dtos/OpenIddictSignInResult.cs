using Newtonsoft.Json;

namespace Idontknow.Domain.Dtos
{
    // TODO: Use type which supplies OpenIddict library
    public class OpenIddictSignInResult
    {
        [JsonProperty("resource")]
        public string Resource { get; set; }    

        [JsonProperty("token_type")]
        public string TokenType { get; set; }  

        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("expires_in")]
        public string ExpiresIn { get; set; }  
    }
}