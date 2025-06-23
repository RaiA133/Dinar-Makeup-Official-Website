import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({node, ...props}) => <p {...props} />,
        strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
        em: ({node, ...props}) => <em className="italic" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3" {...props} />,
        li: ({node, ...props}) => <li className="mb-1" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;