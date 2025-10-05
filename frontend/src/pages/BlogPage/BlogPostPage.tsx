import { Box, Typography, CircularProgress, Paper, Button, IconButton } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug } from "../../services/usePostService";
import { MarkdownRenderer } from "../../components/MarkdownRenderer/MarkdownRenderer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    <Box sx={{ p: 3, maxWidth: 1024, width: '100%', mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
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
        </Box>
        <Button variant="outlined" component={Link} to={`/blog/edit/${post.slug}`}>
          Editar
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <MarkdownRenderer content={post.content} />
      </Paper>
    </Box>
  );
};