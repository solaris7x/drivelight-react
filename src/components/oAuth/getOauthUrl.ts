const getOauthUrl = (client_id: string, redirect_uri: string) => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/drive.readonly",
    prompt: "consent",
    access_type: "offline",
  });
  return `${baseUrl}?${params.toString()}`;
};

export default getOauthUrl;
