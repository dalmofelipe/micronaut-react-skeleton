import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

export interface Post {
  id?: number;
  title: string;
  slug: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getPostBySlug = (slug?: string) => {
  // If slug is not provided or equals 'new', don't run the query and return empty state.
  if (!slug || slug === 'new') {
    return { post: null as any, isLoadingPost: false };
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['post-by-slug', slug],
    queryFn: async () => await api.get(`/posts/slug/${slug}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  return {
    post: data,
    isLoadingPost: isLoading,
    error,
  }
}

export const getAllPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['post-all'],
    queryFn: async () => await api.get(`/posts`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(`Error fetching all posts: ${error.message}`);
      }),
  });

  return {
    allPosts: data,
    isLoadingAllPosts: isLoading,
  }
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await api.post('/posts', post);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the posts list and any single-post slug queries so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ['post-all'] });
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'post-by-slug'
      });
    },
  });
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, post }: { id: number; post: Partial<Post> }) => {
      const response = await api.put(`/posts/${id}`, post);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate list and single-post slug caches so updated content shows immediately
      queryClient.invalidateQueries({ queryKey: ['post-all'] });
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'post-by-slug'
      });
    },
  });
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/posts/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-all'] });
    },
  });
}