import { Box, Typography, CircularProgress, Paper, Button, IconButton, styled } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug } from "../../services/usePostService";
import { MarkdownRenderer } from "../../components/MarkdownRenderer/MarkdownRenderer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostWrapper = styled(Box)`
  padding: 24px;
  max-width: 1024px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderBox = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleGroup = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ContentPaper = styled(Paper)`
  padding: 16px;
`;

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { post, isLoadingPost } = getPostBySlug(slug!);

  if (isLoadingPost) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Post not found</Typography>
      </Box>
    );
  }

  return (
    <PostWrapper>
      <HeaderBox>
        <TitleGroup>
          <IconButton
            onClick={() => navigate('/blog')}
            aria-label="Voltar para Blog"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 3,
              borderRadius: '50%',
              p: 1,
              '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: 6,
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}
            </Typography>
          </div>
        </TitleGroup>
        <Button variant="outlined" component={Link} to={`/blog/edit/${post.slug}`}>
          Editar
        </Button>
      </HeaderBox>
      <ContentPaper>
        <MarkdownRenderer content={post.content} />
      </ContentPaper>
    </PostWrapper>
  );
};