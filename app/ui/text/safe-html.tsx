import DOMPurify from 'isomorphic-dompurify';

export function SafeHTML({ html }: { html: string }) {
    const string = html || "";
    console.log('string constant from SafeHTML: ' + html);
    const sanitizedHtml = DOMPurify.sanitize(string, {
        ADD_TAGS: ['a'],
        ADD_ATTR: ['href', 'target']
    });
    
    return <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}