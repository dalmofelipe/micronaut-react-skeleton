import { Box, Typography, TextField, Button, Paper, CircularProgress, Alert, styled } from "@mui/material";
import MDEditor from '@uiw/react-md-editor';
import '../../styles/md-editor.css';
import { useThemeStore } from '../../store/useThemeStore';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug, useCreatePost, useUpdatePost } from "../../services/usePostService";

const EditWrapper = styled(Box)`
  padding: 24px;
  max-width: 1024px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const EditPaper = styled(Paper)`
  padding: 24px;
`;

const EditActions = styled('div')`
  margin-top: 16px;
  display: flex;
  gap: 16px;
`;

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
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlugValue(post.slug);
      setContent(post.content);
    }
    // try to restore autosaved draft for this slug/new
    const key = isNew ? 'post-draft-new' : `post-draft-${slug}`;
    const draft = localStorage.getItem(key);
    if (!post && draft) {
      setContent(draft);
    }
  }, [post]);

  // autosave draft to localStorage
  useEffect(() => {
    const key = isNew ? 'post-draft-new' : `post-draft-${slug}`;
    const handle = setTimeout(() => {
      if (content && content.length > 0) {
        localStorage.setItem(key, content);
      }
    }, 800);
    return () => clearTimeout(handle);
  }, [content, slug, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !slugValue.trim() || !content.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (content.length > 4000) {
      setError('Conteúdo excede o limite de 4000 caracteres');
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
      <EditWrapper>
        <Typography variant="h4">Post não encontrado</Typography>
      </EditWrapper>
    );
  }

  return (
    <EditWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        {isNew ? 'Novo Post' : 'Editar Post'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <EditPaper>
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Conteúdo (Markdown)
            </Typography>
                
                <div data-color-mode={mode} className={mode === 'dark' ? 'md-editor-transition' : ''}>
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val ?? '')}
                    height={400}
                    preview="live"
                  />
                </div>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                Use Markdown para formatar o texto
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 0.5, color: content.length > 4000 ? 'error.main' : content.length > 3200 ? 'warning.main' : 'text.secondary' }}
                aria-live="polite"
              >
                {content.length} / 4000 caracteres
              </Typography>
          </Box>
          <EditActions>
            <Button type="submit" variant="contained" disabled={createPostMutation.isPending || updatePostMutation.isPending}>
              {createPostMutation.isPending || updatePostMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/blog')}>
              Cancelar
            </Button>
          </EditActions>
        </form>
      </EditPaper>
    </EditWrapper>
  );
};