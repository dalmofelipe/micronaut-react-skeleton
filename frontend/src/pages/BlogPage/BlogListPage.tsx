import { Box, Typography, Card, CardContent, CardActionArea, Grid, CircularProgress, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/usePostService";

const ListWrapper = styled(Box)`
  padding: 24px;
  max-width: 1024px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const ListHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const EmptyText = styled(Typography)`
  margin-top: 24px;
`;

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
    <ListWrapper>
      <ListHeader>
        <Typography variant="h4" component="h1">
          Blog Posts
        </Typography>
        <Button variant="contained" component={Link} to="/blog/new">
          Novo Post
        </Button>
      </ListHeader>

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
        <EmptyText variant="body1">No posts available.</EmptyText>
      )}
    </ListWrapper>
  );
};