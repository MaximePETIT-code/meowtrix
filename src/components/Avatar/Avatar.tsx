import MaterialUIAvatar from '@mui/material/Avatar';

interface AvatarProps {
    name: string;
}

// generate color based on name
function stringToColor(string: string) {
    const materialColors = [
        '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
        '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722', '#795548', '#9E9E9E', '#607D8B',
    ];

    const hash = string.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = Math.abs(hash) % materialColors.length;

    return materialColors[index];
}

// display only the first letter of the name
function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name[0],
    };
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
    return <MaterialUIAvatar {...stringAvatar(name)} />;
};

export default Avatar;
