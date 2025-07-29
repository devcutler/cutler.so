import { Router, Route, Switch } from 'wouter';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ContentPage } from './pages/ContentPage';
import { BlogListPage } from './pages/BlogListPage';
import { SettingsPanel } from './components/SettingsPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useContent } from './hooks/useContent';

function AppContent() {
  const { loading, error } = useContent();
  const { theme } = useTheme();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-red-600 mb-2">Failed to load content</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const getBackgroundClasses = () => {
    switch (theme) {
      case 'terminal':
        return 'min-h-screen';
      case 'neumorphic':
        return 'min-h-screen';
      default:
        return 'min-h-screen';
    }
  };

  return (
    <Router>
      <div className={getBackgroundClasses()}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Switch>
            <Route path="/blog/:slug+">
              <ErrorBoundary>
                <ContentPage />
              </ErrorBoundary>
            </Route>
            <Route path="/blog">
              <ErrorBoundary>
                <BlogListPage />
              </ErrorBoundary>
            </Route>
            <Route path="*">
              <ErrorBoundary>
                <ContentPage />
              </ErrorBoundary>
            </Route>
          </Switch>
        </main>
        <ErrorBoundary>
          <SettingsPanel />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
