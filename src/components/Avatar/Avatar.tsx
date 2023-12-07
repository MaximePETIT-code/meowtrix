import MaterialUIAvatar from '@mui/material/Avatar';

interface AvatarProps {
    name: string;
    img: string | null;
}

// display only the first letter of the name
function stringAvatar(name: string) {
    return {
        children: name[0],
    };
}

const Avatar: React.FC<AvatarProps> = ({ name, img }) => {
    if (img) {
        return <MaterialUIAvatar src={img} />
    }

    return <MaterialUIAvatar sx={{textTransform: 'uppercase'}} {...stringAvatar(name)} />;

};

export default Avatar;
