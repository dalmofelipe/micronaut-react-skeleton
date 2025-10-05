import { Box, Typography, TextField, Button, Paper, CircularProgress, Alert } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug, useCreatePost, useUpdatePost } from "../../services/usePostService";

export const BlogEditPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  // Some routing setups (exact path /blog/new) make useParams() return undefined.
  // Treat the route as "new" when the param equals 'new' or the pathname ends with '/new'.
  const isNew = slug === 'new' || location.pathname.endsWith('/new');

  const { post, isLoadingPost } = isNew ? { post: null, isLoadingPost: false } : getPostBySlug(slug!);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const [title, setTitle] = useState('');
  const [slugValue, setSlugValue] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlugValue(post.slug);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !slugValue.trim() || !content.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      if (isNew) {
        await createPostMutation.mutateAsync({
          title: title.trim(),
          slug: slugValue.trim(),
          content: content.trim()
        });
        navigate('/blog');
      } else if (post) {
        await updatePostMutation.mutateAsync({
          id: post.id,
          post: {
            title: title.trim(),
            slug: slugValue.trim(),
            content: content.trim()
          }
        });
        navigate(`/blog/${slugValue.trim()}`);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar post');
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isNew || !slugValue) {
      setSlugValue(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlugValue(newSlug.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ''));
  };

  if (!isNew && isLoadingPost) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!isNew && !post) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Post não encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1024, width: '100%', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isNew ? 'Novo Post' : 'Editar Post'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            value={title}
            onChange={handleTitleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Slug"
            value={slugValue}
            onChange={handleSlugChange}
            margin="normal"
            required
            helperText="URL amigável do post (apenas letras minúsculas, números e hífens)"
          />
          <TextField
            fullWidth
            label="Conteúdo (Markdown)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={10}
            helperText="Use Markdown para formatar o texto"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" disabled={createPostMutation.isPending || updatePostMutation.isPending}>
              {createPostMutation.isPending || updatePostMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/blog')}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};