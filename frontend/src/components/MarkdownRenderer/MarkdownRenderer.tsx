import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Typography } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <Box sx={{ typography: 'body1' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <Typography variant="h4" component="h1" gutterBottom>{children}</Typography>,
          h2: ({ children }) => <Typography variant="h5" component="h2" gutterBottom>{children}</Typography>,
          h3: ({ children }) => <Typography variant="h6" component="h3" gutterBottom>{children}</Typography>,
          p: ({ children }) => <Typography variant="body1" paragraph>{children}</Typography>,
          ul: ({ children }) => <Box component="ul" sx={{ pl: 2 }}>{children}</Box>,
          ol: ({ children }) => <Box component="ol" sx={{ pl: 2 }}>{children}</Box>,
          li: ({ children }) => <Typography component="li">{children}</Typography>,
          code: ({ children }) => <Box component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>{children}</Box>,
          pre: ({ children }) => <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>{children}</Box>,
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};