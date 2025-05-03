import { Button, Card, CardContent, Typography } from "@mui/material";
import { Email, GitHub } from "@mui/icons-material";
import AuthorBio from "@/components/AuthorBio";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content="Get to know more about LimpidusCoruscans, the author of this tech blog focused on web development and programming." />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content="about, bio, profile, web developer, programmer, tech blog" />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content="About | LimpidusCoruscans Tech Blog" />
        <meta property="og:description" content="Get to know more about LimpidusCoruscans, the author of this tech blog focused on web development and programming." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://limpcoru.github.io/about" />
        <meta property="og:image" content="https://limpcoru.github.io/images/blog-cover.png" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />
        <meta property="profile:username" content="LimpidusCoruscans" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About | LimpidusCoruscans Tech Blog" />
        <meta name="twitter:description" content="Get to know more about LimpidusCoruscans, the author of this tech blog focused on web development and programming." />
        <meta name="twitter:image" content="https://limpcoru.github.io/images/blog-cover.png" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://limpcoru.github.io/about" />
      </Head>
      <Card
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            About
          </Typography>
          <AuthorBio author={'LimpidusCoruscans'} vari="elevation" />
        </CardContent>
      </Card>
      <Card
        sx={{
          borderRadius: '16px',
          marginTop: '1rem',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Contact
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ mb: 2 }}
          >
            <Button
              color="inherit"
              variant="outlined"
              href="mailto:chelhwankim@gmail.com"
              sx={{
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
              startIcon={<Email />}
            >
              chelhwankim@gmail.com
            </Button>
            <br />
            <Button
              color="inherit"
              variant="outlined"
              href="https://github.com/LimpidusCoruscare"
              sx={{
                fontWeight: 'bold',
                textDecoration: 'none',
                marginTop: '1.5rem',
              }}
              startIcon={<GitHub />}
              target="_blank"
              rel="noopener noreferrer"
            >
              LimpidusCoruscare
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}