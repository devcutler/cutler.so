export function Head(): JSX.Element {
	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: `
(function() {
  try {
    const saved = localStorage.getItem('theme-settings');
    const theme = saved ? JSON.parse(saved).theme : 'modern';
    
        document.documentElement.classList.remove('terminal', 'modern', 'neumorphic', 'nier', 'gnome');
    
        document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    
  } catch (error) {
        document.documentElement.classList.add('modern');
    document.documentElement.setAttribute('data-theme', 'modern');
  }
})();
          `,
				}}
			/>
		</>
	);
}