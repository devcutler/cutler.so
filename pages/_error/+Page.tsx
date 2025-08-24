import { usePageContext } from 'vike-react/usePageContext';
import { Link } from '@/components/Link';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Title, Heading, Text } from '@/components/Text';

export default function Page() {
  const pageContext = usePageContext();
  
  let title: string;
  let message: string;
  
  const { abortReason, abortStatusCode, is404 } = pageContext;
  
  if (is404) {
    title = "404";
    message = "The page you're looking for doesn't exist or has been moved.";
  } else if (abortStatusCode === 403) {
    title = "403";
    message = "Access denied. You don't have permission to view this page.";
  } else if (abortStatusCode === 401) {
    title = "401";
    message = "Authentication required. Please log in to access this page.";
  } else if (typeof abortReason === 'string') {
    title = "Error";
    message = abortReason;
  } else {
    title = "500";
    message = "Something went wrong. Please try again later.";
  }

  return (
    <Content>
      <Section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Title className="text-6xl font-bold mb-4">{title}</Title>
          <Heading className="mb-6">
            {is404 ? "Page Not Found" : "Error"}
          </Heading>
          <Text className="mb-8 max-w-md mx-auto">
            {message}
          </Text>
          <Link href="/" className="inline-block px-6 py-3 button">
            Go Home
          </Link>
        </div>
      </Section>
    </Content>
  );
}