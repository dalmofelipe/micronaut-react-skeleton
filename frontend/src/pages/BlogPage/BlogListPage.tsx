import { Box, Typography, Card, CardContent, CardActionArea, Grid, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/usePostService";

export const BlogListPage = () => {
  const { allPosts, isLoadingAllPosts } = getAllPosts();

  if (isLoadingAllPosts) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1024, width: '100%', mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Blog Posts
        </Typography>
        <Button variant="contained" component={Link} to="/blog/new">
          Novo Post
        </Button>
      </Box>
      <Grid container spacing={3}>
        {allPosts?.map((post: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <Card>
              <CardActionArea component={Link} to={`/blog/${post.slug}`}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {(!allPosts || allPosts.length === 0) && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No posts available.
        </Typography>
      )}
    </Box>
  );
};